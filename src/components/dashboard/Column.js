import './styles.css'
import Widget from "./Widget";

const Column = ({ size, heading, widgets }) => {
    return (
        // Not sure if this is the `size` for since requirements doesn't state it
        <div className="column">
            <h5>{heading}</h5>
            <hr />
            <div className="column-body">
                {widgets.map((widget) => (
                    <div
                        key={widget.title}
                        style={{ flexBasis: `${100 / size}%` }}
                    >
                        <Widget
                            type={widget.type}
                            title={widget.title}
                            subtitle={widget.subtitle}
                            api={widget.api}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Column;