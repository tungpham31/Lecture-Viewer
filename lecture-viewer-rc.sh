# A configuration file that you should source before running the
# lecture viewer application!

# We need to know where are local libraries are created:
export NODE_PATH=`pwd`/server/lib

# We need this for testing purposes in a local environment. You should
# comment this out if you are not running in a local environment:
export CONFIG_Media_root=`pwd`/media
