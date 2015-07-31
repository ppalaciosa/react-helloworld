var Container = React.createClass({

    render: function(){
        var items = this.props.items;
        var components = items.map(function(item,i){
            return (<Boton name={item} id={i}/>);
        });
        
        return (
            <ul>
                {components}
            </ul>);
    }
});

var Boton = React.createClass({

    render: function(){
        return (<li>{this.props.name}</li>);
    }
});



React.render(
    <Container items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.body
);
