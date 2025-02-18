const calculateBalance=(account:string, amount:number,type_in:string,balance:number=0.0)=>{
    if(account==="ingreso" || account==="egreso"){
        balance = balance+amount;
    }else if(account==="pasivo" || account==="capital"){
        //sila cuenta aumenta por el debe  y es uno de este reglon el balance-monto
        //sino balance+monto
        balance = type_in === 'debe' ? balance-amount : balance+amount
    }else{
        //sila cuenta aumenta por el debe  y es uno de este reglon el balance+monto
        //sino balance-monto
        balance = type_in === 'debe' ? balance+amount : balance-amount
    }
    return balance
}

export { calculateBalance };