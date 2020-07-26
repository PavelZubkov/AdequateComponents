import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Card, Text, Button } from "./components";

const Dialog0 = (props) => {
  return (
    <Card className="dialog">
      <Card.Header className="dialog_header">
        <Text.Title className="dialog_title">Welcome</Text.Title>
      </Card.Header>
      <Card.Body className="dialog_body">How are you?</Card.Body>
      <Card.Footer className="dialog_footer">
        <Button className="dialog_button-cancel">Cancel</Button>
        <Button className="dialog_button-ok">Ok</Button>
      </Card.Footer>
    </Card>
  );
}
const defaultProps = {};
const useAdequateComponent = (name) => {
  const ProxyComponent = () => (props) => {
    debugger;
    const { as: Component, children, ...rest } = props;
    return <Component {...rest} name>{children}</Component>;
  };
  const internalProxy = new Proxy({}, {
    get(target, prop, receiver) {
      debugger;
      
      const resultName = `${name.toLowerCase()}_${prop.toLowerCase()}`;
      const Component = ProxyComponent(resultName);
      Object.defineProperty(Component, 'name', {
        writable: true,
      });
      Component.name = resultName;
      Object.defineProperty(Component, 'name', {
        writable: false,
      });
      return Component;
    }
  })
  return internalProxy;
};
// надо создать дефолтные пропы и установить им реальные компоненты
// и заюзать их вместо реальных компонентов

/*
инструкция расширения состоит из двух частей: селектор и тело
селектор:
 селектор по структуре
  select(dialog_header).append(<Loader loading={props.isLoading} />)
 по блоку
  select(Card.Header).replace(null)
манипуляция узлам:
  append, prepend, before, after, replace, remove, wrap, removeWrapper
  ps: глянь что умеет jquery
перенаправление:
  (например dialog_header_title перенести в dialog_body)
манипуляция пропсами:
  например, было:
    <Dialog>
      <Dialog_Header>...
      <Dialog_Body>
      ...
  стало
    <Dialog>
      <Dialog_Header>{props.headerContent}</Dialog_Header>
      <Dialog_Body className={`type_${props.type}`}>
      ...и эти пропсы должны попасть в проп тайпсы компонента
  Надо осмыслить стоит ли полностью подражать бем или нет, кажется что это самый гибкий способ
  навешивать стили
  надо поразбираться в xslt возможно будет полезным
 */
// Dialog0.adequateExtend((ext, props) => {
// })
// Через JSX сделать обновление

function Dialog(props) {
  const Dialog_ = useAdequateComponent('dialog');
  const element = (
    <Dialog_.Root as={Card}>
      <Dialog_.Header as={Card.Header}>
        <Dialog_.Title as={Text.Title}>Welcome</Dialog_.Title>
      </Dialog_.Header>
      <Dialog_.Body as={Card.Body}>How are you?</Dialog_.Body>
      <Dialog_.Footer as={Card.Footer}>
        <Dialog_.ButtonCancel as={Button}>Cancel</Dialog_.ButtonCancel>
        <Dialog_.ButtonOk as={Button} onClick={() => alert('ok')}>Ok</Dialog_.ButtonOk>
      </Dialog_.Footer>
    </Dialog_.Root>
  );
  // console.log('before', element);
  //  из исходного компонента построить подобие bemjson его менять, из измененного генерировать новые эелементы?
  // const children = element.props.children.slice();
  // children.push(<h1>ops</h1>)
  //
  // const after = React.cloneElement(element, {}, children);
  // Заменить надпись в title
  // console.log('after', after);
  // return after;
  return element;
}

function Dialog2(p) {
  return (
    <p.dialog>
      <p.dialog_header>
        <p.dialog_header_title>{p.dialog_header_title_sub}</p.dialog_header_title>
      </p.dialog_header>
      <p.dialog_body>{p.dialog_body_sub}</p.dialog_body>
      <p.dialog_footer>
        <p.dialog_footer_buttonCancel>{p.dialog_footer_buttonCancel_sub}</p.dialog_footer_buttonCancel>
        <p.dialog_footer_buttonOk>{p.dialog_footer_buttonOk_sub}</p.dialog_footer_buttonOk>
      </p.dialog_footer>
    </p.dialog>
  )
}
Dialog2.defaultProps = {
  dialog: Card,
  dialog_header: Card.Header,
  dialog_header_title: Text.Title,
  dialog_header_title_sub: 'Welcome',
  dialog_body: Card.Body,
  dialog_body_sub: 'How are you?',
  dialog_footer: Card.Footer,
  dialog_footer_buttonCancel: Button,
  dialog_footer_buttonCancel_sub: 'Cancel',
  dialog_footer_buttonOk: Button,
  dialog_footer_buttonOk_sub: 'Ok',
}
export default () => {
  // const dialog = <Dialog2 dialog_footer_buttonOk_sub="Cancel" />;
  const dialog = <Dialog />
  return (
    <>
      {dialog}
    </>
  );
}
