import Widget from "./Widget";

const defaultWidth = 150;

const Column = ({ size, heading, widgets }) => {
    return (
        <div style={{ width: defaultWidth*size }}>
            <h2>{heading}</h2>
            <hr />
            {widgets.map((widget) => (
                <Widget
                    key={widget.title}
                    type={widget.type}
                    title={widget.title}
                    subtitle={widget.subtitle}
                    api={widget.api}
                />
            ))}
        </div>
    )
}

export default Column;