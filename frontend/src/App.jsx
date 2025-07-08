import { Switch, Route, Redirect } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext/index'
import { SavedVideoProvider } from './context/SavedVideoContext/index.jsx'

import Login from './components/Login/index'
import Home from './components/Home/index'
import VideoDetails from './components/VideoDetails/index'
import SavedVideos from './components/SavedVideos/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import NotFound from './components/NotFound/index'

import './App.css'

const App = () => (
  <ThemeProvider>
    <SavedVideoProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute exact path="/gaming" component={Gaming} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <ProtectedRoute exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </SavedVideoProvider>
  </ThemeProvider>
)

export default App
