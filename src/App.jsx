import signupMainBanner from './assets/signup-main-banner.png'
import './App.scss'
import SignupForm from './components/SignupForm'
import Image from './components/Image'

function App() {
  return (
    <div className="main-container">
      <h3 className="heading">
        <img style={{ width: '28px', height: '24px' }} src="ninja-hattori.png" alt="logo" />
        &nbsp;&nbsp;QualityHealth
      </h3>

      <div className="main-banner">
        <Image
          src={signupMainBanner}
          alt="sharecare banner"
          imgStyle={{
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      </div>

      <div className="form-section">
        <SignupForm />
      </div>
    </div>
  )
}

export default App
