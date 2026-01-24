  export const GroupFooterData = (FooterServices) => {
    console.log("FooterServices::",FooterServices)
    const columns = 4;
    const perColumn = Math.ceil(FooterServices.length / columns);
  
    const grouped = [];
    for (let i = 0; i < columns; i++) {
      const start = i * perColumn;
      const end = start + perColumn;
      grouped.push({
        links: FooterServices.slice(start, end),
      });
    }
    console.log("Grouped::",grouped)
    return grouped;
  };