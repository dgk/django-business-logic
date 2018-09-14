from django.contrib.staticfiles.finders import AppDirectoriesFinder


class AppDirectoriesIndexFinder(AppDirectoriesFinder):

    def find_in_app(self, app, path):
        path += '/index.html'
        return super(AppDirectoriesIndexFinder, self).find_in_app(app, path)
