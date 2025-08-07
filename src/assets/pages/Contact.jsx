import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulaire soumis:', formData)
    // Ici vous pourriez ajouter la logique d'envoi
    alert('Message envoyé ! (simulation)')
  }

  return (
    <div className="contact">
      <div className="container">
        <div className="contact__header">
          <h1 className="page-title">Contactez-moi</h1>
          <div className="page-subtitle">Discutons de votre projet</div>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <h2>Parlons ensemble</h2>
            <p>
              Vous avez un projet en tête ? Une question sur mes services ? 
              N'hésitez pas à me contacter. Je serais ravie d'échanger avec vous 
              et de donner vie à vos idées.
            </p>
            
            <div className="contact__details">
              <div className="contact__item">
                <strong>Email</strong>
                <span>thecodeofsp@gmail.com</span>
              </div>
              <div className="contact__item">
                <strong>Localisation</strong>
                <span>France</span>
              </div>
              <div className="contact__item">
                <strong>Disponibilité</strong>
                <span>Disponible pour de nouveaux projets</span>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn--primary btn--full">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact