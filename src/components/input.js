function Input({label,placeholder,type}) {
    return(
        <div>
            <label>{label}</label>
            <input type={type} placeholder={placeholder} />
        </div>
    )
}
export default Input;