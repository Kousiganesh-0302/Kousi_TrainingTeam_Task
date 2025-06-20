export const exportToCSV = (data, currentPage, postPerPage, filename = 'expenses') => {
    if (!data || data.length === 0) {
        throw new Error('No data to export');
    }

    const headers = ['SL.No', 'ID', 'Vendor', 'Amount', 'Category', 'Date', 'Status'];

    const rows = data.map((item, index) => [
        (currentPage - 1) * postPerPage + index + 1, 
        item.id,
        item.vendor,
        item.amount,
        item.category,
        item.date, 
        item.status
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // link.download = `${filename}_page${currentPage}.csv`;
    link.download = `ExpenseCSV_${currentPage}_${postPerPage}_per_page.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };