var HomePage = React.createClass({
    getInitialState: function() {
    	return {stocks: "The stocks haven't been loaded yet!"};
        
	},	
	
	loadStatusFromServer: function() {
		feed.onConnect(
        	//callback2
          function(string) {
        	
        	if (string) { 
        		console.log(string);
        		var stringObject=JSON.parse(string);
        
        		if (stringObject.stock){
        			
        			var currentState=this.state.stocks;
        			for (var i=0; i<currentState.length; i++)
        				
        				if (currentState[i].stock==stringObject.stock){
        					//alert(currentState[i].stock);
        					currentState[i].value=stringObject.value;
        					this.setState({stocks: currentState});
        					}
        		}
        		else {
        			
        			this.setState({stocks: stringObject});
        		}
        	}
          }.bind(this)
        ); 
  	},
	
    componentDidMount: function() {
    	this.loadStatusFromServer();
    },
    
    
    render: function () {
    	var currentState=this.state.stocks;
    	var rows = [];
		for (var i=0; i < currentState.length; i++) {
    		rows.push(<div><p>{currentState[i].stock} {currentState[i].value}</p></div>);
		}
    
        return (
            <div>
                {rows}
            </div>
        );
        
    }
});

React.render(<HomePage />, document.getElementById('main'));