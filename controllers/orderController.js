import OrderModel from '../model/Order.model.js'
const p1=29;
const p2=49;
const p3=149;


function getProductPrice(product) {
    const priceMap = {
        'Product 1': p1,
        'Product 2': p2,
        'Product 3': p3,
    };

    return priceMap[product] || 0;
}

//to get all order details
export async function getAllOrder(req, res){
    try {
        OrderModel.find().then(data=>{
            res.json(data)
        }).catch(e=>{
            res.json({message:e})
        })
       

    } catch (error) {
        return res.status(404).send({ error });
    }
}

//to get one order by id (unique)
export async function getOrderbyid(req, res){
    try {
        const order = await OrderModel.findOne({id:req.params.id});
        
        if(!order){
            return res.status(404).json({ message: "order not found" });
        
        }
        res.json(order);

    } catch (error) {
        return res.status(404).send({ error });
    }
}


//to add an order
export async function addOrder(req, res){
    try {
        const { id, customer_name, customer_email, product, quantity} = req.body;
       
        const orderid=new Promise((resolve, reject)=> {
            OrderModel.findOne({ id }, function(err, id){
                if(err) reject(new Error(err))
                if(id) reject({ error : "Please use unique id"});

                resolve();
            })
        });

        var order_value=0;
        if(product === "Product 1")order_value=p1;
        if(product === "Product 2")order_value=p2;
        if(product === "Product 3")order_value=p3;
        
        order_value=order_value*quantity;

        Promise.all([ orderid])
            .then(() => {
                            const order = new OrderModel({
                                id,
                                customer_name,
                                customer_email,
                                product,
                                quantity,
                                order_value
                            });

                            // return save result as a response
                            order.save()
                                .then(result => res.status(201).send({ msg: "Order Saved Successfully"}))
                                .catch(error => res.status(500).send({error}))

            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(404).send({ error });
    }
}


//to edit order
export async function editOrder(req, res) {
    const { product, quantity } = req.body;
    const id = req.params.id; // Extract the order ID from the request parameters 
    try {
        const order = await OrderModel.findOne({ id: id });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const price = getProductPrice(product);
        const orderValue = price * quantity;

        const updatedOrder = {
            product,
            quantity,
            order_value: orderValue,
        };

        // Use async/await with updateOne
        await OrderModel.updateOne({ id }, updatedOrder);

        return res.status(200).json({ msg: "Record Updated" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


//to delete an order
export async function deleteOrder(req, res){
    const orderId = req.params.id; // Extract the order ID from the request parameters

    try {
        // Find the order by ID and delete it
        const deletedOrder = await OrderModel.findOneAndDelete({id:orderId});

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}