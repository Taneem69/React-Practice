import './Notification.css';

export default function Notification({message}:{message:string}){
    return <div className='notification'>{message}</div>
}