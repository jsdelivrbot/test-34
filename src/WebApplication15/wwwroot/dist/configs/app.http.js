'use strict';

System.register([], function (_export, _context) {
	"use strict";

	_export('default', function (config) {

		config.useStandardConfiguration().withDefaults({
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'X-Requested-With': 'Fetch'
			}
		}).withInterceptor({
			request: function request(_request) {
				return _request;
			},
			response: function response(_response) {
				return _response;
			}
		});
	});

	return {
		setters: [],
		execute: function () {}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3MvYXBwLmh0dHAuanMiXSwibmFtZXMiOlsiY29uZmlnIiwidXNlU3RhbmRhcmRDb25maWd1cmF0aW9uIiwid2l0aERlZmF1bHRzIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwid2l0aEludGVyY2VwdG9yIiwicmVxdWVzdCIsInJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBZSxVQUFVQSxNQUFWLEVBQWtCOztBQUU3QkEsU0FBT0Msd0JBQVAsR0FDRUMsWUFERixDQUNlO0FBQ1ZDLGdCQUFhLGFBREg7QUFFVkMsWUFBUztBQUNMLGNBQVUsa0JBREw7QUFFTCx3QkFBb0I7QUFGZjtBQUZDLEdBRGYsRUFRRUMsZUFSRixDQVFrQjtBQUNiQyxVQURhLG1CQUNMQSxRQURLLEVBQ0k7QUFFYixXQUFPQSxRQUFQO0FBQ0gsSUFKWTtBQUtiQyxXQUxhLG9CQUtKQSxTQUxJLEVBS007QUFDZixXQUFPQSxTQUFQO0FBQ0g7QUFQWSxHQVJsQjtBQWtCSCxFIiwiZmlsZSI6ImNvbmZpZ3MvYXBwLmh0dHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
