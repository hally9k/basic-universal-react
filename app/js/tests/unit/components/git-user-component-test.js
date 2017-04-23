import GitHubUser from 'components/github-user-component';
import React from 'react';
import { shallow } from 'enzyme';

function setup(testKey) {
    const props = {
        user: {
            getGitHubUser: jest.fn(),
            user: {
                avatar_url: 'https://myimage.com', // eslint-disable-line camelcase
                login: 'hally9k',
                id: '123456'
            },
            error: null
        },
        error: {
            getGitHubUser: jest.fn(),
            user: null,
            error: {
                message: 'ajax error 404'
            }
        }
    }[testKey];

    const enzymeWrapper = shallow(<GitHubUser {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('components', () => {
    describe('GitHubUser', () => {
        it('should render the user when given a valid user object', () => {
            const { enzymeWrapper } = setup('user');
            expect(enzymeWrapper.find('label').text()).toBe('GitHub User: ');
            expect(enzymeWrapper.find('button').text()).toBe('Get User');
            expect(enzymeWrapper.find('div.github-user img').prop('src')).toBe('https://myimage.com');
            expect(enzymeWrapper.find('div.github-user h2').text()).toBe('hally9k');
            expect(enzymeWrapper.find('div.github-user h4').text()).toBe('ID: 123456');
        });

        it('should render error when given a an error', () => {
            const { enzymeWrapper } = setup('error');
            expect(enzymeWrapper.find('label').text()).toBe('GitHub User: ');
            expect(enzymeWrapper.find('button').text()).toBe('Get User');
            expect(enzymeWrapper.find('div.github-error h1').text()).toBe('😢');
            expect(enzymeWrapper.find('div.github-error h2').text()).toBe('ajax error 404');
        });
    });
});
