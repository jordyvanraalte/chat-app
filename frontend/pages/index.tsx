import type { NextPage } from 'next'
import ChatComponent from "../components/home/chat";

const Home: NextPage = () => {
  return (
      <div className="flex items-center justify-center h-screen">
        <ChatComponent />
      </div>

  )
}

export default Home
