export default (text) => {

    text = text.charAt(0).toUpperCase() + text.slice(1);
    text = text.split('.').join("");
    return text;
};