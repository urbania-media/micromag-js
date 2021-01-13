import EventEmitter from 'wolfy87-eventemitter';

class MediasRepository extends EventEmitter {
    static getMediaPath({ id }) {
        return `media://${id}`;
    }

    constructor(medias = {}) {
        super();
        this.medias = medias || {};
    }

    find(path) {
        const { media = null } = this.medias[path] || {};
        console.log(path, this.medias);
        return media;
    }

    add(media) {
        if (media === null) {
            return null;
        }
        const path = MediasRepository.getMediaPath(media);
        this.medias = {
            ...this.medias,
            [path]: {
                refs: ((this.medias[path] || {}).refs || 0) + 1,
                media,
            },
        };
        this.triggerOnChange();
        return path;
    }

    remove(media) {
        if (media === null) {
            return null;
        }
        const path = MediasRepository.getMediaPath(media);
        if (typeof this.medias[path] !== 'undefined') {
            this.medias = Object.keys(this.medias).reduce((newMedias, key) => {
                const currentMedia = this.medias[key];
                if (key === path) {
                    const refs = currentMedia.refs - 1;
                    return refs > 0
                        ? {
                              ...newMedias,
                              [key]: {
                                  ...currentMedia,
                                  refs,
                              },
                          }
                        : newMedias;
                }
                return {
                    ...newMedias,
                    [key]: currentMedia,
                };
            }, {});
            this.triggerOnChange();
        }
        return path;
    }

    // eslint-disable-next-line class-methods-use-this
    path(media) {
        return MediasRepository.getMediaPath(media);
    }

    triggerOnChange() {
        this.emit('change', this.medias);
    }
}

export default MediasRepository;
