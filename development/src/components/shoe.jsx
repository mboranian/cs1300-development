import Button from '@mui/material/Button';

export default function Shoe(props) {

    function helper() {
        if (props.cart[props.item.name] > 0) {
            return false;
        }else{
            return true;
        }
    }



    return (
        <div class="Shoe" >
            <img src={props.item.image} alt={props.item.color} class="pic" />
            <div class="ShoeButtons">
                <h2>{props.item.name}</h2>
                <p>{props.item.price}</p>
                <div class="cartButtons">
                    <Button variant='contained' onClick={() => { props.incr(props.item.name) }}>
                        Add to Cart
                    </Button>
                    <Button disabled={helper()} variant='contained' color="error" onClick={() => { props.decr(props.item.name) }}>
                        Remove from Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}