import app from './express';
import config from '../config';

const port = 5000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);   
    };
    console.log(`server running at port ${port}`);  
})

