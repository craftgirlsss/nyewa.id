function RegisterValidation(values){
    // alert("")
    let error = {}

    if(values.name === ""){
        error.name = "Nama tidak boleh kosong"
    }else{
        error.name = ""
    }

    return error
}

export default RegisterValidation;