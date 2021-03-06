import React from "react";
import assert from "power-assert";
import { render, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Notification from "../index";

describe("<Notification/>", () => {
  it("should render a <Notification/> components", () => {
    const wrapper = render(
      <div>
        <Notification title="哈哈" type="success" />
        <Notification title="哈哈" type="error" />
        <Notification title="哈哈" type="info" />
        <Notification title="哈哈" type="warning" />
        <Notification title="哈哈" type="loading" />
        <Notification title="哈哈" type="open" />
      </div>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should 2s ago emit callback", () => {
    const wrapper = shallow(
      <Notification
        title="哈哈"
        type="success"
        duration={2}
        onClose={() => wrapper.setProps({ title: "回调" })}
      />
    );

    setTimeout(() => {
      assert(wrapper.props().title === "回调");
    }, 2000);
  });

  it("should trigger onClose event", () => {
    const onClose = jest.fn();
    const wrapper = shallow(
      <Notification
        title="哈哈"
        type="success"
        duration={2}
        onClose={onClose}
      />
    );
    wrapper
      .find(".cuke-notification-close-btn")
      .simulate("click", { stopPropagation: () => {} });
    expect(onClose).toHaveBeenCalled();
  });

  it("should render destroy reference", () => {
    const notification = Notification.success();
    assert(notification.destroy && notification.destroy instanceof Function);
  });

  it("should enable scroll and disabled scroll", () => {
    const wrapper = shallow(
      <Notification visible={false}>
        <span>1</span>
      </Notification>
    );
    wrapper.update();
    expect(document.body.style.paddingRight).toBe("0px");
    wrapper.setState({
      visible: true
    });
    wrapper.update();
    setTimeout(() => {
      expect(document.body.style.paddingRight).toBe("15px");
    });
  });

  it("should cannot find <Notification/> when destroy", () => {
    const message = Notification.success();
    message.destroy();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-success").length === 0);
    }, 10);
  });
  it("should render <Notification/> when call notification open static method", () => {
    Notification.open();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-open").length === 1);
    }, 10);
  });
  it("should render <Notification/> when call notification success static method", () => {
    Notification.success();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-success").length === 1);
    }, 10);
  });
  it("should render <Notification/> when call notification error static method", () => {
    Notification.error();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-error").length === 1);
    }, 10);
  });
  it("should render <Notification/> when call notification info static method", () => {
    Notification.info();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-info").length === 1);
    }, 10);
  });
  it("should render <Notification/> when call notification warning static method", () => {
    Notification.warning();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-warning").length === 1);
    }, 10);
  });
  it("should render <Notification/> when call notification loading static method", () => {
    Notification.loading();
    setTimeout(() => {
      assert(document.querySelector(".cuke-notification-loading").length === 1);
    }, 10);
  });

  it("should find top-right custom position", () => {
    const wrapper = shallow(
      <Notification title="哈哈" type="success" position="top-right" />
    );
    assert(wrapper.find(".cuke-notification-open-top-right").length === 1);
  });
  it("should find bottom-left custom position", () => {
    const wrapper = shallow(
      <Notification title="哈哈" type="success" position="bottom-left" />
    );
    assert(wrapper.find(".cuke-notification-open-bottom-left").length === 1);
  });
  it("should find top-left custom position", () => {
    const wrapper = shallow(
      <Notification title="哈哈" type="success" position="top-left" />
    );
    assert(wrapper.find(".cuke-notification-open-top-left").length === 1);
  });

  it("should find bottom-right custom position", () => {
    const wrapper = shallow(
      <Notification title="哈哈" type="success" position="bottom-right" />
    );
    assert(wrapper.find(".cuke-notification-open-bottom-right").length === 1);
  });

  it("should find bottom-right custom position", () => {
    const wrapper = Notification.success({
      title: "通知标题",
      message: "黄瓜 ui 开发中黄瓜 ui 开发中黄瓜 ui 开发中黄瓜 ui 开发中",
      position: "bottom-left"
    });
    wrapper.destroy();
    setTimeout(() => {
      const dom = document.querySelector(
        ".cuke-notification-close-bottom-left"
      );
      assert(dom && dom.length >= 1);
    });
  });

  it("should 2s ago emit onClick", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Notification
        title="哈哈"
        type="success"
        duration={2}
        onClick={onClick}
      />
    );
    wrapper.find(".cuke-notification").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
  it("should disabled scroll when did update", () => {
    const wrapper = shallow(<Notification title="关闭回调" />);
    wrapper.update();
    assert(document.body.style.overflow === "");
  });
});
