import ListWidget from "./ListWidget";
import NumberWidget from "./NumberWidget";

const Widget = ({ type, ...props }) => {
    switch (type) {
        case "list":
            return <ListWidget {...props} />
        case "number":
            return <NumberWidget {...props} />
        default:
            return `type "${type}" is not supported`
    }
}

export default Widget;