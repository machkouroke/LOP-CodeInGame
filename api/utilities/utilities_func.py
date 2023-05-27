def field(name: str):
    """
    Decorator to add a dynamic field to a pydantic model
    :param name: Name of the field
    :return: Decorator
    """

    def decorator(func):
        @property
        def wrapper(self, *args, **kwargs):
            # Code avant l'appel de la méthode
            result = func(self, *args, **kwargs)
            self.__dict__[name] = result
            # Code après l'appel de la méthode
            return result

        return wrapper

    return decorator