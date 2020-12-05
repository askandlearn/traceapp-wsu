


    export default class Timer extends Component {
        state = {
            minutes: 1,
            seconds: 0,
            startDisabled: true,
            stopDisabled: false
        }
        
        constructor( props ) {
          super( props );
    
          this.onButtonStart = this.onButtonStart.bind(this);
          this.onButtonStop = this.onButtonStop.bind(this);
          this.onButtonClear = this.onButtonClear.bind(this);
          this.start = this.start.bind(this);
      }
    
        start() {
          let timer = setInterval(() => {
                const { seconds, minutes } = this.state
    
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: seconds - 1
                    }))
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer)
                    } else {
                        this.setState(({ minutes }) => ({
                            minutes: minutes - 1,
                            seconds: 59
                        }))
                    }
                } 
            }, 1000);
            this.setState({timer});
        }
    
        onButtonStart() {
          this.start();
          this.setState({startDisabled: true, stopDisabled: false});
      }
      onButtonStop() {
          clearInterval(this.state.timer);
          this.setState({startDisabled: false, stopDisabled: true});
      }
      onButtonClear() {
          this.setState({
            minutes: 1,
            seconds: 0,
          });
      }
    
        render() {
            const { minutes, seconds } = this.state
            return (
                <View>
                  <Text style={{justifyContent:'center', alignSelf:'center'}}>
                    { minutes === 0 && seconds === 0
                        ? <Text>Busted!</Text>
                        : <Text>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                    }
                  </Text>
                  <Button title="Start"  onPress={()=>this.onButtonStart()}></Button>
                        <Button title="Stop" onPress={()=>this.onButtonStop()}></Button>
                        <Button title="Clear" onPress={()=>this.onButtonClear()}></Button>
                </View>
            )
        }
    }