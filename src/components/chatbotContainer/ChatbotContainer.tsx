import Form from '../form/Form';

function ChatbotContainer() {
 const date = new Date();

  return (
    <section className="chatbot-container">
        <div className="chatbot-header">
            <h3 className="sub-heading">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</h3>
        </div>
        <Form/>
    </section>
  )
}

export default ChatbotContainer