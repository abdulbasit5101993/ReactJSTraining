export function FirstMiddleware(store){
    return function(next){
        return function(action){
            var result = next(action);
            return result;
        } 
    }
}