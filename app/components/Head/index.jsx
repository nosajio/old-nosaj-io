import { PropTypes, Component } from 'react';

class Head extends Component {
  constructor(props) {
    super(props);
  }
  
  static propTypes = {
    children: PropTypes.node,
  };
  
  componentDidMount() {
    this.hoistChildren();
  }
  
  render() {
    // This component doesn't explicitly return any DOM nodes. Instead, it 
    // hoists its children to the document's <head>
    return null;
  }
  
  hoistChildren() {
    this.props.children.forEach(child => {
      if (this.isConflicting(child)) {
        this.removeFromHead(child);
      }
      this.addToHead(child);
    });
  }
  
  removeFromHead(node) {
    const elementToRemove = document.head.querySelector(`meta[name=${node.props.name.replace(':', '\\:')}]`);
    if (! elementToRemove) return;
    document.head.removeChild(elementToRemove);
  }
  
  /**
   * Add Tag To Head
   * @param {ReactElememnt} node
   */
  addToHead(node) {
    const holdingElement = document.createElement(node.type);
    if (node.props.name) {
      holdingElement.name = node.props.name;
    }
    // When a item is empty, just skip it
    if (! node.props.property || ! node.props.content) return;
    if (node.props.property) {
      holdingElement.property = node.props.property;
    }
    if (node.props.content) {
      holdingElement.content = node.props.content;
    }
    document.head.appendChild(holdingElement);
  }
  
  isConflicting(node) {
    const currentNodes = document.head.querySelectorAll(`meta`);
    const conflicts = [];
    currentNodes.forEach(n => {
      if (n.name === node.props.name) {
        conflicts.push(n);
      }
    });
    return conflicts.length > 0;
  }
}

export default Head;
