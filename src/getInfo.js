function GetInfo({inofs}){
    return(
        <div>
            <p>
                My name is {inofs.name}
            </p>
            <p>
                I am {inofs.age} years old.
            </p>
        </div>
    )
}

export default GetInfo;