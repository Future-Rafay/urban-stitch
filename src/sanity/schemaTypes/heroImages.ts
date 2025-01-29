const HeroImages = {
    name: 'heroImage',
    type: 'document',
    title: 'Hero Image',
    
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Image Title'
        }
        ,
        {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true, // Allows focus point selection
            },
        }
    ]
}

export default HeroImages;