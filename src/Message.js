import { Card, CardContent, Typography } from '@material-ui/core'
import React ,{ forwardRef}from 'react'
import './Message.css'

const Message=forwardRef((props,ref) =>{
    const isUser=props.username===props.data.username;
    console.log(props.username);
    console.log(props.data.username);
    console.log(isUser);

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser? "message__userCard":"message__guestCard"}>
                <CardContent>
                {!isUser && `${props.data.username || 'Unknown User'} says:` }
                    <Typography variant="h5" component="h2">
                        {props.data.message}
                    </Typography>
                    
                </CardContent>



            </Card>
        </div>
    )
})

export default Message
