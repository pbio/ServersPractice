var HomePage = React.createClass({
    getInitialState: function() {
    	return {stocks: "The stocks haven't been loaded yet!"};
        
	},	
	
	loadStatusFromServer: function() {
		feed.onConnect(
			//callback1
		  function(string){
        	if (string) {
        		alert("String is real");
        		this.setState({stocks: string});
        	}
        	else {
        		alert("String is not working!!");
        	}
          }.bind(this), 
        	//callback2
          function(string) {
        	alert("quick pause");
        	if (string) { 
        		console.log(JSON.stringify(string));
        		this.setState({stocks: JSON.stringify(string)});
        	}
          }.bind(this)
        ); 
  	},
	
    componentDidMount: function() {
    	this.loadStatusFromServer();
        //feed.onChange(function(string) {
        //	alert("quick pause");
        //	if (string) { 
        //		console.log(JSON.stringify(string));
        //		this.setState({stocks: JSON.stringify(string)});
        //	}
        //}.bind(this));
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