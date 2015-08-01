var Container = React.createClass({
    getInitialState: function(){
        return { focused: 0 };
    },
    clickCallback: function(index){
        // Para pasar al hijo. Index del hijo seleccionado
        this.setState({focused: index});
    },
    render: function(){
        var items = this.props.items;
        var self = this;
        var components = items.map(function(item,i){
            return (<Boton name={item}
                           index={i}
                           clickCallback={self.clickCallback}
                           selected={i==self.state.focused}/>);
        });
        // console.log('boton es: ', self.state.focused);
        return (
            <ul>
                {components}
                <p>El botón seleccionado es: {items[self.state.focused]}</p>
            </ul>);
    }
});

var Boton = React.createClass({
    onClickHandler: function(event){ 
        // El parametro 'event' no es usado en este caso,
        // pero se sugiere mantenerlo para futuros casos
        // con manejo de eventos
        this.props.clickCallback(this.props.index);
    },
    render: function(){
        var selected = this.props.selected;
        var className = selected? "focused": " ";
        return (<li onClick={this.onClickHandler}
                    className={className}>
                {this.props.name} 
        </li>);
    }
});


React.render(
    <Container items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.body
);
