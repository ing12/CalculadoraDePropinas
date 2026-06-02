import { MenuItem, OrderItem } from "../types";

//definir acciones y los argumentos de las acciones
export type OrderActions = 
    {type: 'add-item', payload: {item: MenuItem}} |
    {type: 'remove-item', payload: {id: MenuItem['id']}} |
    {type: 'add-tip', payload:{value:number}} |
    {type: 'place-order'}

//definir los tipos para el initialState
export type OrderState = {
    order: OrderItem[],
    tip: number
}
                    //asignar el tipo al initialState
export const initialState: OrderState = {
    order: [],
    tip:0
}

//unir las acciones con el initialState para hacer las modificaciones según la acción
export const orderReducer =(
    state: OrderState = initialState,
    action: OrderActions
)=>{

    switch (action.type) {
        case "add-item":{
            const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
            let updatedOrder: OrderItem[] = []
            if(itemExist) {
                updatedOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ? 
                    {...orderItem, quantity: orderItem.quantity + 1 } : 
                    orderItem
                )
            } else {
                const newItem: OrderItem  = {...action.payload.item, quantity: 1}
                updatedOrder = [...state.order, newItem]
            }
            return {
                ...state,
                order: updatedOrder
            }
        }
        
        case "remove-item":{
            const order = state.order.filter( item => item.id !== action.payload.id )
            return {
                ...state,
                order
            }
        }

        case "add-tip":{
            const tip =  action.payload.value 
            return {
                ...state,
                tip
            }
        }

        case "place-order":
            return {
                ...state,
                order:[],
                tip:0
            }
    
        default:
            break;
    }
    return state
}