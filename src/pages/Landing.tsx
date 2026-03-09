import ScrollScene from '../components/landing/ScrollScene'
import InvitationSection from '../components/landing/InvitationSection'
import WorkshopSection from '../components/landing/WorkshopSection'
import FinalSection from '../components/landing/FinalSection'

export default function Landing() {
  return (
    <div className="min-h-dvh">
      <ScrollScene />
      <InvitationSection />
      <div id="workshop-section">
        <WorkshopSection />
      </div>
      <div id="final-section">
        <FinalSection />
      </div>
    </div>
  )
}

