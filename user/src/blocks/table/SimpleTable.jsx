import CommonTable from "../../components/tables/CommonTable";

export const SimpleTable = ({ title, content, isWrappableHeader,autoWidth }) => {
  const rows = content?.sections?.rows;
  const columns = content?.sections?.columns;

  const isReactElements = Array.isArray(rows) && rows.length > 0 && rows[0]?.type === "tr";

  // Helper render function for special types
  const renderCellValue = (column, value) => {
    const { type, by, prevTexts } = column;

    // --- Case 1: Ordered List ---
    if (type === "order-list") {
      if (Array.isArray(value)) {
        const listStyle = by === "number" ? "decimal" : by === "alpha" ? "lower-alpha" : "none";
        return (
          <ol
            className="pl-5 text-[14px] 2xl:text-[18px] align-top"
            style={{ listStyleType: listStyle }}
          >
            {value.map((item, idx) => (
              <li key={idx} className="text-nowrap">{item}</li>
            ))}
          </ol>
        );
      }
    }

    // --- Case 2: Unordered List ---
    if (type === "unorder-list") {
      if (Array.isArray(value)) {
        const listStyle = by === "none" ? "none" : "disc";
        return (
          <ul
            className="pl-5 text-[14px] 2xl:text-[18px] align-top"
            style={{ listStyleType: listStyle }}
          >
            {value.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      }

      // --- Case 2.1: Object + prevTexts (e.g. date.from / date.to) ---
      if (typeof value === "object" && prevTexts?.length) {
        const keys = Object.keys(value);
        return (
          <ul className="pl-5 text-[14px] 2xl:text-[18px] align-top" style={{ listStyleType: "none" }}>
            {keys.map((key, idx) => (
              <li key={idx} className="text-nowrap ">
                <span>{prevTexts[idx] ?? ""}</span> {value[key]}
              </li>
            ))}
          </ul>
        );
      }
    }

    // --- Case 3: Default text ---
    return <span className="text-[14px] 2xl:text-[18px] align-top">{value ?? ""}</span>;
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
        {title}
      </h3>

      {columns && (
        <CommonTable
          isWrappableHeader={isWrappableHeader}
          columns={columns}
          data={
            isReactElements
              ? rows // directly pass <tr> rows
              : rows?.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex !== rows.length - 1 && "border-b border-[#D8D8D8]"
                    } text-[#000000] text-[16px] mx-2`}
                  >
                    {columns.map((column, colIndex) => {
                      const accessor = column.accessor;
                      const cellValue = row[accessor];
                      if (accessor === "file") return null;

                      return (
                        <td
                          key={colIndex}
                          className={`py-2 px-[19px] first:w-[150px] align-top ${
                            accessor === "file_name"
                              ? isWrappableHeader
                                ? "w-auto"
                                : "last:w-[400px] md:last:w-full"
                              : isWrappableHeader
                              ? "w-auto"
                              : autoWidth?"w-[600px] md:w-[35%]":"w-[600px] md:w-[45%]"
                          } `}
                        >
                          {renderCellValue(column, cellValue)}
                        </td>
                      );
                    })}
                  </tr>
                ))
          }
        />
      )}
    </div>
  );
};
