function Validation(values){
    // alert("")
    let error = {}
    const email_pattern = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-]$/

    if(values.email === ""){
        error.email = "Email tidak boleh kosong"
    }else if(!email_pattern.test(values.email)){
        error.email = "Email tidak ditemukan"
    }else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }else if(!password_pattern.test(values.password)){
        error.password = "Kata sandi tidak ditemukan"
    }else{
        error.password = ""
    }
    return error
}

export default Validation;