import produce from 'immer'

const initialState={
    product:[{
        id:1,
        name:'milk',
        price:4.9
    }]
}

export default produce((state,action)=>{
    switch(action.type){
        case 'SET_ID':state.product.id=action.payload
        break;
        case 'SET_NAME':state.product.name=action.payload
        break;
        case 'SET_PRICE':state.product.price=action.payload
        break;
    }
},initialState)