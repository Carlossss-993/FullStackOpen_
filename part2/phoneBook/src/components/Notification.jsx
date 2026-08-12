const Notification = ({ notification }) => {

    if (notification) {
        const { message, isAnError } = notification
        if (isAnError) {
            return <h3 className="error">{message}</h3>
        }
        return <h3 className="notification">{message}</h3>
    }
    return null
};

export default Notification;