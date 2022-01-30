function formattedNumber(val) {
    if (!isNaN(parseInt(val))) {
        return new Intl.NumberFormat("en-IN").format(val);
    } else {
        return val;
    }
};


export { formattedNumber };