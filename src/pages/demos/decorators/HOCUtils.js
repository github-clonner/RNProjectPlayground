import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import DefaultLoading from './CommonLoading'
import DefaultNetError from './CommonNetError'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const enhanceFetch = (WrappedComponent, options) => class extends Component {
  static propTypes = {
    requestQueues: PropTypes.array.isRequired,
  }
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadError: false,
      data: null,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    try {
      const { requestQueues } = this.props
      const requestHandlers = []

      requestQueues.map(request => requestHandlers.push(this.convertHandler(request)))
      const requestResults = await Promise.all(requestHandlers)
      this.setState({
        isLoading: false,
        data: requestResults.length === 1 ? requestResults[0] : requestResults,
      })
    } catch (e) {
      this.setState({
        isLoading: false,
        isLoadError: true,
      })
    }
  }

  convertHandler = ({url, options = {}}) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.json())
        // TODO：实际上这里还应有接口响应 code 的判断，eg：code === 1 → success
        // 具体跟接口同事协商即可
        .then(responseData => resolve(responseData))
        .catch(err => reject(err))
    })
  }

  handleReload = () => this.setState({ isLoading: true, isLoadError: false }, this.fetchData)

  handleUpdateData = data => this.setState({ data })

  render() {
    const { style, ...rest } = this.props
    const { isLoadError, isLoading, data } = this.state
    const isShowContent = !isLoading && !isLoadError
    const ShowedLoading = options && options.loading || DefaultLoading
    const ShowedNetError = options && options.error || DefaultNetError

    return (
      <View style={[styles.root, style]}>
        {isLoading && <ShowedLoading />}
        {isLoadError && <ShowedNetError onReload={this.handleReload} />}
        {isShowContent &&
          <WrappedComponent
            {...rest}
            data={data}
            updateData={this.handleUpdateData}
            fetchData={this.fetchData}
          />
        }
      </View>
    )
  }
}

export { enhanceFetch }