import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table, Sort, updateSearchTopStoriesState } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search onSubmit={() => {}}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search onSubmit={() => {}}>Search</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={() => {}}>More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={() => {}}>More</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles className and children correctly', () => {
    const element = shallow(
      <Button onClick={() => {}} className='testClass'>ButtonChild</Button>
    );

    expect(element.find('.testClass').text()).toBe('ButtonChild');
  });
});

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    onDismiss: () => {},
    sortKey: 'NONE',
    isSortReverse: false,
  };

  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props} />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const element = shallow(
      <Table { ...props } />
    );

    expect(element.find('.table-row').length).toBe(2);
  });
});

describe('Sort', () => {
  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sort sortKey={'NONE'}>Sort</Sort>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('setting page state after getting api return', () => {
  const page = 0;
  // Real hits that I pulled from the api
  const hits = [
    {
      author: "jdeal",
      comment_text: null,
      created_at: "2017-05-05T14:14:17.000Z",
      created_at_i: 1493993657,
      num_comments: 155,
      objectID: "14273549",
      parent_id: null,
      points: 395,
      story_id: null,
      story_text: null,
      story_title: null,
      story_url: null,
      title: "Build Yourself a Redux",
      url: "https://zapier.com/engineering/how-to-build-redux/",
      _highlightResult: {title: {}, url: {}, author: {}},
      _tags: (3) ["story", "author_jdeal", "story_14273549"],
    },
    {
      author: "callumlocke",
      comment_text: null,
      created_at: "2017-07-20T11:43:46.000Z",
      created_at_i: 1500551026,
      num_comments: 104,
      objectID: "14811577",
      parent_id: null,
      points: 370,
      story_id: null,
      story_text: null,
      story_title: null,
      story_url: null,
      title: "Things to learn in React before using Redux",
      url: "https://www.robinwieruch.de/learn-react-before-using-redux/",
      _highlightResult: {title: {}, url: {}, author: {}},
      _tags: (3) ["story", "author_callumlocke", "story_14811577"],
    }
  ];

  const defaultState = {
    result: null,
    searchKey: 'testKey',
    searchTerm: '',
    error: null,
    isLoading: false,
  };

  it('correctly updates the default state', () => {
    const newState = updateSearchTopStoriesState(hits, page)(defaultState);
    expect(newState.results.testKey.hits.length).toBe(2);
    expect(newState.isLoading).toBe(false);
  });
});