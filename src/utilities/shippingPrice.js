export const setShippingFee =   ( cond) => {
    let price 
    switch (cond){
        case "South West":
        price = 1500;
        break;
        case "South East":
        price = 2500;
        break;
        case "South South":
        price = 3000;
        break;
        case "North":
        price = 3500;
        break;
        case "FCT":
        price = 2000;
        break;
        default:
            price= 2000
            
            
    }
    return price
}