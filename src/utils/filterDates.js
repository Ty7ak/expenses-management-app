export default (date, filter) => {
    
    date = date.replaceAll('-', '');

    let from = String(filter.dateFrom);
    let to = String(filter.dateTo);

    from = from.replaceAll('-', '');
    to = to.replaceAll('-', '');

    if (from <= date && date <= to) {
        return true
    } else return false
    
  };