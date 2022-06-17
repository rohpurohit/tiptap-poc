import React, { Component } from "react";
import styles from "../index.css";
class CommandsList extends Component {
  state = {
    selectedIndex: 0,
  };

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown({ event }) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index) {
    const item = this.props.items[index];

    if (item) {
      this.props.command(item);
    }
  }

  render() {
    const { items } = this.props;
    return (
      <div className="items">
        {items.map((item, index) => {
          return (
            <article
              className={`item flex ${
                index === this.state.selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.highlightedTitle || item.title,
                  }}
                />
              </span>
            </article>
          );
        })}
      </div>
    );
  }
}

export default CommandsList;
