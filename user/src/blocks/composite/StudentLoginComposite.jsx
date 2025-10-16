import React from "react";
import { Link } from "react-router-dom";

const StudentLoginComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  const loginSection = content.sections.find(
    (sec) => sec.type === "login-form"
  );
  const createAccountSection = content.sections.find(
    (sec) => sec.type === "Create-Account"
  );

  return (
    <div className="w-full flex flex-col gap-10">
      {/* ---------- LOGIN SECTION ---------- */}
      <div className="w-full flex flex-col gap-6 bg-[#f8f8f8e7] rounded-[20px] p-6 md:p-10 shadow-sm">
        {/* Page Title */}
        <div>
          <h3 className="text-[#001F51] text-[22px] md:text-[26px] font-[600] text-center md:text-left">
            {title}
          </h3>
          <p className="text-[#555] text-[15px] mt-2 text-center md:text-left">
            Please enter your email and password to continue.
          </p>
        </div>

        {/* ---------- Login Form Area ---------- */}
        {loginSection && (
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left: Form */}
            <div className="flex-1 flex flex-col gap-6">
              {loginSection.text && (
                <p className="text-[16px] text-[#333]">
                  {loginSection.text}
                </p>
              )}

              <form className="flex flex-col gap-5 w-full">
                {loginSection.formFields.map((field, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-[#001F51] text-[15px] font-[500]"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="border border-[#C0F0FF] rounded-[8px] px-4 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2F8AA5]"
                    />

                    {/* Forgot Password */}
                    {field.name === "password" &&
                      loginSection.forgotPassword && (
                        <Link
                          to="/forgot-password"
                          className="text-[#001F51] text-[13px] font-[500] mt-1 hover:underline self-start"
                        >
                          {loginSection.forgotPassword}
                        </Link>
                      )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="bg-[#001F51] w-full sm:w-[50%] md:w-[37%] text-white rounded-[39px] py-[12px] text-[16px] font-[500] hover:bg-[#012b74] transition-all self-center md:self-start"
                >
                  {loginSection.submitButton.text}
                </button>
              </form>
            </div>

            {/* Right: Image */}
            {loginSection.image?.boy_img && (
              <div className="flex justify-center md:justify-end w-full md:w-[280px]">
                <div className="h-[240px] md:h-[280px] w-[200px] md:w-[260px] bg-[#f7eadc] rounded-[12px] flex justify-center items-center">
                  <img
                    src={loginSection.image.boy_img}
                    alt="login illustration"
                    className="w-[200px] md:w-[260px] h-[240px] md:h-[280px] object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- CREATE ACCOUNT SECTION ---------- */}
      {createAccountSection && (
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 mt-10 bg-[#ececef] rounded-[20px] px-6 md:px-10 py-8">
          {createAccountSection.content.map((item, index) => (
            <React.Fragment key={index}>
              {/* Image */}
              {item?.image?.girl_img && (
                <div className="flex justify-center md:justify-start w-full md:w-[300px]">
                  <img
                    src={item.image.girl_img}
                    alt="create account illustration"
                    className="w-[240px] md:w-[340px] object-contain"
                  />
                </div>
              )}

              {/* Text & Buttons */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
                <h4 className="text-[#001F51] text-[20px] md:text-[22px] font-[600]">
                  {item.heading}
                </h4>

                {Array.isArray(item.text)
                  ? item.text.map((t, i) => (
                      <p key={i} className="text-[#333] text-[15px] leading-relaxed">
                        {t}
                      </p>
                    ))
                  : <p className="text-[#333] text-[15px]">{item.text}</p>}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                  {item.button.map((btn, i) => (
                    <button
                      key={i}
                      className={`${
                        i === 0
                          ? "bg-[#001F51] text-white"
                          : "bg-[#093D81] text-white"
                      } px-6 py-2 rounded-[35px] text-[14px] font-[500] hover:opacity-90 transition-all`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentLoginComposite;
