import moment from "moment";

export const validateEmail = (email) => {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
}


export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if(fractionalPart){
        return `${formattedInteger}.${fractionalPart}`;
    }
    return formattedInteger;
}


export const prepareExpenseBarCharData = (data = []) => {
    const charData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }))

    return charData;
}

export const prepareIncomeBarCharData = (data = []) => {       
    const charData = data.map((item) => ({
        source: item?.source,
        amount: item?.amount,
    }))

    return charData;
}



export const prepareSortedIncomeBarChartData = (data = []) => {           //used in IncomeOverview.jsx

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map((item) => ({
        month: moment(item?.date).format("DD MMM"),
        amount: item?.amount,
        source: item?.source,
    }))

    return charData;
}



export const  prepareExpenseLineChartData = (data = []) => {           //used in ExpenseOverview.jsx

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const charData = sortedData.map((item) => ({
        month: moment(item?.date).format("DD MMM"),
        amount: item?.amount,
        category: item?.category,
    }))

    return charData;
}



