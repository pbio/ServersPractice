var HomePage = React.createClass({
    getInitialState: function() {
        feed.onConnect(function(string){
        	if (string) return {stocks: string};
        	else return {stocks: ""};
        }.bind(this));
        return {stocks: ""};
	},	
    componentDidMount: function() {
        feed.onChange(function(string) {
        	if (string) { 
        		console.log(JSON.stringify(string));
        		this.setState({stocks: JSON.stringify(string)});
        	}
        }.bind(this));
        
    },
    
    
    render: function () {
        return (
            <div>
                <div className="row">
                    <div>{this.state.stocks}</div>
                </div>
            </div>
        );
    }
});

React.render(<HomePage />, document.getElementById('main'));