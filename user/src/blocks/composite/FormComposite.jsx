import { useState, useEffect } from 'react';

export const FormComposite = ({ content, title }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showValidationPopup, setShowValidationPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    if (!content || !content.sections) return null;

    // Initialize form data
    useEffect(() => {
        const initialData = {};
        content.sections.forEach(section => {
            if (section.name) {
                initialData[section.name] = section.value || '';
            }
        });
        setFormData(initialData);
    }, [content.sections]);

    const handleInputChange = (name, value, validationRules) => {
        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            validateField(name, value, validationRules);
        }

        // Call external onChange if provided
        const section = content.sections.find(sec => sec.name === name);
        section?.onChange?.(value);
    };

    const handleBlur = (name, value, validationRules) => {
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validateField(name, value, validationRules);
    };

    const validateField = (name, value, rules) => {
        const newErrors = { ...errors };
        
        if (!rules) {
            delete newErrors[name];
            setErrors(newErrors);
            return true;
        }

        // Required validation
        if (rules.required && (!value || value.toString().trim() === '')) {
            newErrors[name] = rules.requiredMessage || 'This field is required';
        } 
        // Min length validation
        else if (rules.minLength && value && value.length < rules.minLength) {
            newErrors[name] = rules.minLengthMessage || `Minimum ${rules.minLength} characters required`;
        }
        // Max length validation
        else if (rules.maxLength && value && value.length > rules.maxLength) {
            newErrors[name] = rules.maxLengthMessage || `Maximum ${rules.maxLength} characters allowed`;
        }
        // Email validation
        else if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
            newErrors[name] = rules.emailMessage || 'Please enter a valid email address';
        }
        // Number range validation
        else if (rules.min !== undefined && value && Number(value) < rules.min) {
            newErrors[name] = rules.minMessage || `Value must be at least ${rules.min}`;
        }
        else if (rules.max !== undefined && value && Number(value) > rules.max) {
            newErrors[name] = rules.maxMessage || `Value must be at most ${rules.max}`;
        }
        // Custom validation
        else if (rules.custom && value) {
            const customError = rules.custom(value);
            if (customError) {
                newErrors[name] = customError;
            } else {
                delete newErrors[name];
            }
        }
        else {
            delete newErrors[name];
        }

        setErrors(newErrors);
        return !newErrors[name];
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        content.sections.forEach(section => {
            if (section.name && section.validation) {
                const fieldValid = validateField(section.name, formData[section.name], section.validation);
                if (!fieldValid) {
                    isValid = false;
                }
            }
        });

        return isValid;
    };

    const showPopup = (message) => {
        setPopupMessage(message);
        setShowValidationPopup(true);
        setTimeout(() => {
            setShowValidationPopup(false);
        }, 5000);
    };

    const handleSubmit = () => {
        // Mark all fields as touched
        const allTouched = {};
        content.sections.forEach(section => {
            if (section.name) {
                allTouched[section.name] = true;
            }
        });
        setTouched(allTouched);

        const isValid = validateForm();
        
        if (isValid) {
            content.onSubmit?.(formData);
        } else {
            // Show popup with validation errors
            const errorMessages = Object.values(errors).filter(error => error);
            if (errorMessages.length > 0) {
                showPopup(`Please fix the following errors:\n• ${errorMessages.join('\n• ')}`);
            } else {
                showPopup('Please fill in all required fields correctly.');
            }
        }
    };

    const renderInput = (section) => {
        const commonProps = {
            value: formData[section.name] || '',
            onChange: (value) => handleInputChange(section.name, value, section.validation),
            onBlur: () => handleBlur(section.name, formData[section.name], section.validation),
            placeholder: section.placeholder,
            required: section.required,
            className: `w-full px-3 py-2 border rounded-[5px] focus:outline-none ${
                errors[section.name] && touched[section.name] 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[#07739445] focus:border-[#077394]'
            }`
        };

        switch (section.inputType) {
            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows={section.rows || 4}
                        onChange={(e) => commonProps.onChange(e.target.value)}
                        className={commonProps.className + ' resize-vertical'}
                    />
                );

            case 'stringinput':
                return (
                    <input
                        type="text"
                        {...commonProps}
                        onChange={(e) => commonProps.onChange(e.target.value)}
                    />
                );

            case 'numberinput':
                return (
                    <input
                        type="number"
                        {...commonProps}
                        min={section.min}
                        max={section.max}
                        step={section.step}
                        onChange={(e) => commonProps.onChange(e.target.value)}
                    />
                );

            case 'email':
                return (
                    <input
                        type="email"
                        {...commonProps}
                        onChange={(e) => commonProps.onChange(e.target.value)}
                    />
                );

            case 'dropdown':
                return (
                    <select
                        {...commonProps}
                        className='w-full px-3 py-2 border border-[#07739445] rounded-[5px] focus:outline-none bg-white'
                        onChange={(e) => commonProps.onChange(e.target.value)}
                    >
                        <option value="">Select a type</option>
                        {section.options?.map((option, optionIndex) => (
                            <option key={optionIndex} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">{title ?? ""}</h3>
            
            {/* Validation Popup */}
            {showValidationPopup && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md animate-fade-in">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Validation Error</span>
                        <button 
                            onClick={() => setShowValidationPopup(false)}
                            className="ml-4 text-white hover:text-gray-200 text-lg"
                        >
                            ×
                        </button>
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-line">{popupMessage}</p>
                </div>
            )}

            <div className={`w-full grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`}>
                {content.sections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        {/* Label */}
                        {section.label && (
                            <label className="text-sm font-medium text-gray-700">
                                {section.label}
                                {section.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                        )}

                        {/* Input Field */}
                        {renderInput(section)}
                        
                        {/* No error messages displayed below fields - only in popup */}
                    </div>
                ))}
                
                {content.sections.length > 0 && (
                    <div className="flex items-end">
                        <button 
                            onClick={handleSubmit}
                            className="bg-[#002147] w-full xl:w-fit border-1 border-[#07739445] text-white px-6 py-2 rounded-[5px] hover:bg-blue-700 transition-colors  disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={content.disableButton || false}
                        >
                            {content?.buttonText ?? "Submit"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};