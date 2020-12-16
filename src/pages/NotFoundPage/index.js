import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/animations/404.json'
import './style.less'

export default class NotFound extends React.Component {
  _pageName = 'not-found-page'

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className={this._pageName}>
        <Lottie
          height={300}
          width={300}
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
        />
      </div>
    )
  }
}
