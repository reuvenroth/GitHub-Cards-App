// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn
// more friend samples: shmuwol, sharshi, dlehren, reuvenroth

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
  state = { userName: '' }; //initializes an empty form
  handleSubmit = async (event) => { //added async
    event.preventDefault(); //prevents page reload
    //fetch can be used here instead of:
   const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
   this.props.onSubmit(resp.data);
   this.setState({ userName: '' }); //resets form after input submission
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username" 
          required /> //required throws alert to "please fill out this field"
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [], //empty array to receive appended profiles
};

/* Longer, current JS syntax:
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: testData,
    };
  }
*/
  
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData] //...prevState concats current & new
    }))
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);
